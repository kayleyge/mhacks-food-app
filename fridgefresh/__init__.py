from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
app.config.from_object('fridgefresh.config')
CORS(app)

from fridgefresh.api import user, food

with app.app_context():
    from .api import user, food
    # Additional routes can be initialized here

#def create_app():
   # app = Flask(__name__)
    
    # Import and register blueprints
  #  from .user import user_bp
  #  app.register_blueprint(user_bp, url_prefix='/api/v1')
    
  #  return app