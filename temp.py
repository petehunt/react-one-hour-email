# dump script to extract out sample json
avatar = '''<img class="email-avatar" alt=".*?" src="(?P<avatar>.*?)" height="65" width="65"/>'''
name = '''<h5 class="email-name">(?P<name>.*?)</h5>'''
subject = '''<h4 class="email-subject">(?P<subject>.*?)</h4>'''
desc = '''<p class="email-desc">(?P<desc>[^<]+)</p>'''

all = [avatar, name, subject, desc]
import re

src = open('app.js', 'r').read()
res = [re.findall(x, src)[1:] for x in all]

final = []
import json

for avatar,name,subject,desc in zip(*res):
    final.append(
        dict(
            avatar=avatar,
            name=name,
            subject=subject,
            desc=desc.strip()
        )
    )
print json.dumps(final)
