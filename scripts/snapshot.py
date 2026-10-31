#!/usr/bin/env python3
"""Create an immutable source ZIP, Git-history bundle and checksum manifest."""
import argparse, hashlib, json, pathlib, re, subprocess, zipfile
from datetime import datetime, timezone
p=argparse.ArgumentParser();p.add_argument('name');p.add_argument('--ref',default='HEAD');p.add_argument('--output',required=True);a=p.parse_args()
if not re.fullmatch(r'[A-Za-z0-9][A-Za-z0-9._-]*',a.name):p.error('Use a simple version name')
root=pathlib.Path(__file__).resolve().parents[1]
def git(*args):return subprocess.check_output(['git','-C',str(root),*args]).decode().strip()
if git('status','--porcelain'):p.error('Commit all changes before creating a snapshot')
sha=git('rev-parse',a.ref+'^{commit}');dest=pathlib.Path(a.output).resolve()/a.name;dest.mkdir(parents=True,exist_ok=False)
subprocess.run(['git','-C',str(root),'archive','--format=zip','--prefix='+a.name+'/', '-o',str(dest/'source.zip'),sha],check=True)
subprocess.run(['git','-C',str(root),'bundle','create',str(dest/'history.bundle'),'--all'],check=True)
subprocess.run(['git','-C',str(root),'bundle','verify',str(dest/'history.bundle')],check=True,capture_output=True)
with zipfile.ZipFile(dest/'source.zip') as z:
 assert z.testzip() is None
 assert a.name+'/index.html' in z.namelist()
manifest={'name':a.name,'commit':sha,'createdUtc':datetime.now(timezone.utc).isoformat(),'repository':git('remote','get-url','origin'),'files':{f.name:hashlib.sha256(f.read_bytes()).hexdigest() for f in dest.iterdir() if f.is_file()}}
(dest/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(dest)
