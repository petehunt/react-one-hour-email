from lxml.html import clean

import argparse
import datetime
import imaplib
import getpass
import json

import pyzmail.parse

def fetch_email(username, password, host, ssl, days):
    if ssl:
        mail = imaplib.IMAP4_SSL(host)
    else:
        mail = imaplib.IMAP4(host)
    mail.login(username, password)
    mail.list()
    mail.select('inbox')
    since = datetime.datetime.now() - datetime.timedelta(days=days)
    result, data = mail.uid('search', '(SINCE %s)' % since.strftime('%d-%B-%Y'))

    emails = []
    for uid in data[0].split(' '):
        result, email_data = mail.uid('fetch', uid, '(RFC822)')
        raw_email = email_data[0][1]
        email_message = pyzmail.parse.PyzMessage.factory(raw_email)
        name,addr = email_message.get_address('from')
        if email_message.html_part:
            text = email_message.html_part.get_payload()
        else:
            text = "<pre>" + email_message.text_part.get_payload() + "</pre>"
        text = clean.clean_html(text)[5:-6].strip()
        plaintext_cleaner = clean.Cleaner(allow_tags=[''], remove_unknown_tags=False)
        plaintext = plaintext_cleaner.clean_html(text)[5:-6].strip()
        desc = plaintext.split('\n')[0].strip()[:255]
        emails.append(
            dict(
                name=name,
                subject=email_message['Subject'],
                content=text,
                desc=desc,
                avatar='https://profile-a.xx.fbcdn.net/hprofile-ash3/c178.0.604.604/s320x320/600249_1002029915098_1903163647_n.jpg',
                timestamp=email_message['Date'],
                unread=True # TODO: pull this from the inbox
            )
        )
    return emails

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Fetch your inbox as JSON')
    parser.add_argument('-u', '--username', required=True, help='Username or email address')
    parser.add_argument('-s', '--ssl', action="store_true", help='Use SSL')
    parser.add_argument('-p', '--password', help='Password')
    parser.add_argument('-i', '--imap', required=True, help='IMAP server')
    parser.add_argument('-d', '--days', default=3, help='Number of days to fetch')
    args = parser.parse_args()
    password = args.password
    if not args.password:
        password = getpass.getpass()
    print json.dumps(fetch_email(args.username, password, args.imap, args.ssl, args.days))
