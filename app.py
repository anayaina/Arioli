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


@app.route('/italiana')
def italiana():
    return render_template('italiana.html')


@app.route('/argentina')
def argentina():
    return render_template('argentina.html')


@app.route('/china')
def china():
    return render_template('china.html')


@app.route('/cocina')
def cocina():
    return render_template('cocina.html')


@app.route('/conservas')
def conservas():
    return render_template('conservas.html')


@app.route('/japonesa')
def japonesa():
    return render_template('japonesa.html')


@app.route('/tailandesa')
def tailandesa():
    return render_template('tailandesa.html')


@app.route('/panaderia')
def panaderia():
    return render_template('panaderia.html')


@app.route('/reposteria')
def reposteria():
    return render_template('reposteria.html')


@app.route('/taquiza')
def taquiza():
    return render_template('taquiza.html')


@app.route('/navidad')
def navidad():
    return render_template('navidad.html')


@app.route('/parrilladas')
def parilladas():
    return render_template('parrilladas.html')


if __name__ == '__main__':
    app.run(debug=True)
