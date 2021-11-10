from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def principal():
    return render_template('principal.html')

@app.route('/nosotros')
def nosotros():
    return render_template('nosotros.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/registro')
def registro():
    return render_template('registro.html')

if __name__ == '__main__':
    app.run(debug=True)
    
    
    