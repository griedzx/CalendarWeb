import requests
from bs4 import BeautifulSoup
import smtplib
from email.mime.text import MIMEText
import time
import schedule

def check_calendar():
    # 爬取网页
    response = requests.get('https://your-calendar-url.com')
    soup = BeautifulSoup(response.text, 'html.parser')

    # 在 HTML 中找到日历事件
    events = soup.find_all('div', class_='event')

    # 检查每个事件
    for event in events:
        if 'your event' in event.text:
            send_email()

def send_email():
    # 创建邮件
    msg = MIMEText('Your event is coming up!')
    msg['Subject'] = 'Calendar Alert'
    msg['From'] = 'your-email@gmail.com'
    msg['To'] = 'your-email@gmail.com'

# 每周一的 10:00 运行 check_calendar
schedule.every().monday.at("10:00").do(check_calendar)

while True:
    # 运行所有可以运行的任务
    schedule.run_pending()
    time.sleep(1)