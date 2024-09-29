from flask import Flask 
from flask_mail import Mail, Message 
   
app = Flask(__name__) 
mail = Mail(app) 
   
# configuration of mail 

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'yourId@gmail.com'
app.config['MAIL_PASSWORD'] = '*****'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app) 
   
# message object mapped to a particular URL ‘/’ 
@app.route("/message/") 
def message(): 
   msg = Message( 
                'Hello', 
                sender ='yourId@gmail.com', 
                recipients = ['receiver’sid@gmail.com'] 
               ) 
   msg.body = 'Hello your food is expiring soon'
   mail.send(msg) 
   return 'Sent'
   
if __name__ == '__main__': 
   app.run(debug = True) 