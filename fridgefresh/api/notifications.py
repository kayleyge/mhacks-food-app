import firebase_admin
from firebase_admin import credentials, messaging

cred = credentials.Certificate("path/to/firebase/credentials.json")
firebase_admin.initialize_app(cred)

def send_push_notification(token, title, body):
    message = messaging.Message(
        notification=messaging.Notification(
            title=title,
            body=body,
        ),
        token=token,
    )
    response = messaging.send(message)
    print('Successfully sent message:', response)

# Use this function to send notifications when needed