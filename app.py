from flask import Flask, render_template 

app = Flask(__name__)

@app.route('/')
def principal():
    return render_template('principal.html')

@app.route('/nosotros')
def nosotros():
    return render_template('nosotros.html')

@app.route('/internacional')
def internacional():
    return render_template('internacional.html')

@app.route('/gourmet')
def gourmet():
    return render_template('gourmet.html')

@app.route('/especial')
def especial():
    return render_template('especial.html')

@app.route('/mexicana')
def mexicana():
    return render_template('mexicana.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/registro')
def registro():
    return render_template('registro.html')

@app.route('/cart')
def cart():
    return render_template('cart.html')

if __name__ == '__main__':
    app.run(debug=True)