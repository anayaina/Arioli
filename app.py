from flask import Flask, render_template,request,session
from werkzeug.utils import redirect
import json
import os
import secrets

app = Flask(__name__)
app.secret_key = secrets.token_hex(16)
app.run(debug=True)

#abrir diccionario usuarios
with open('static/usuarios/usuarios.json') as f:
    dict_usuarios = json.load(f)

@app.route('/',methods=['GET','POST'])
def principal():
    return render_template('principal.html')

@app.route('/cart')
def cart():
    return render_template('cart.html')

@app.route('/nosotros')
def nosotros():
    return render_template('nosotros.html')

@app.route('/user')
def user():
    return render_template('user.html')

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

@app.route('/inicio',methods=['GET','POST'])
def inicio():
    error = None
    if request.method == 'POST':
        email = request.form['email']
        #verificamos si el usuario esta registrado
        if email in dict_usuarios:
            #verificamos la contraseña del usuario
            if dict_usuarios[email]['password'] == request.form['password']:
                session['username'] = dict_usuarios[email]['name']
                '''
                session['nombre'] = diccionarioUsuariosArchivo[request.form['usuario']][1]
                session['user'] = request.form['usuario']''' #lo dejo xq no sé xq hay nombre y user en session
                return redirect('/')
            else:
                return render_template('inicio.html',error='Contraseña incorrecta')
        else:
            return render_template('inicio.html',error='Correo incorrecto')
    else:
        return render_template('inicio.html')

@app.route('/registro',methods=['GET','POST'])
def registro():
    error=None
    if request.method == 'POST':
        name, surname, email, password = request.form['name'], request.form['surname'], request.form['email'], request.form['password']
        if email in dict_usuarios:
            return render_template('registro.html', error='Correo ya registrado')
        dict_usuarios[email]={}
        dict_usuarios[email]['name'] = name
        dict_usuarios[email]['surname'] = surname
        dict_usuarios[email]['password'] = password
        dict_usuarios[email]['carrito'] = None
        dict_usuarios[email]['pedido'] = None
        dict_usuarios[email]['admin'] = False
        with open('static/usuarios/usuarios.json', 'w') as fp:
                json.dump(dict_usuarios, fp)
        session['username'] = name
        return redirect('/')
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


def actualizarArchivo(diccionarioUsuario,diccionarioArchivo):
    #juntamos los diccionarios
    diccionarioArchivo.update(diccionarioUsuario)
            
    #metemos los datos al json
    with open('static/usuarios/usuarios.json',"w") as outfile:  #abrimos el archivo e indicamos que vamos a escribir en él
        json.dump(diccionarioArchivo,outfile)
        
