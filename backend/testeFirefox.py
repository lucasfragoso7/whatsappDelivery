from selenium import webdriver
import time
import sqlite3
from flask import Flask, request
import json
import random
import os

app = Flask(__name__)
if __name__ == "__main__":
    app.run()
global contatos

@app.route("/recuperarContatos", methods=['GET'])
def recuperarContatos():
    listContatos = {}
    listaContatosJson = []
    connBd = sqlite3.connect('C:/bancoDeDados.db')
    for contato in connBd.execute('select * from contatos'):
        listContatos = {"nome": contato[1], "id": contato[0],
                        "telefone": contato[2],
                        "cidade": contato[3], "email": contato[4]}
        listaContatosJson.append(listContatos)
    connBd.close()
    response = app.response_class(
        response=json.dumps(listaContatosJson),
        status=200,
        mimetype='application/json')
    return response

@app.route("/apagarContato/<id>", methods=['DELETE'])
def apagarContato(id):
    id = str(id)
    aspas = "'"
    connBd = sqlite3.connect('C:/bancoDeDados.db')
    connBd.execute('delete from contatos where id_contato = ' + aspas + id + aspas)
    connBd.commit()
    connBd.close()
    response = app.response_class(
            status=200,
            mimetype='application/json')
    return response

@app.route("/salvarContato", methods=['POST'])
def salvarContato():
    connBd = sqlite3.connect('C:/bancoDeDados.db')
    content = request.json
    if('id' not in content):
       salvarNovoContato(content, connBd)
    else:
        editarContato(content, connBd)
    connBd.close()
    response = app.response_class(
            status=200,
            mimetype='application/json')
    return response

def editarContato(content, connBd):
    aspas = "'"
    virgula = ","
    nome = content['nome']
    telefone = content['telefone']
    email = content['email']
    cidade = content['cidade']
    id = str(content['id'])
    connBd.execute('update contatos set nome_contato = '
                   + aspas +  nome + aspas + virgula +
                    ' telefone_contato = ' +
                    aspas + telefone + aspas + virgula +
                    ' cidade_contato = ' +
                    aspas + cidade + aspas + virgula +
                   ' email_contato = ' +
                    aspas + email + aspas +
                   ' where id_contato =' + aspas + id + aspas)
    connBd.commit()



def salvarNovoContato(content, connBd):
    aspas = "'"
    virgula = ","
    nome = content['nome']
    telefone = content['telefone']
    email = content['email']
    cidade = content['cidade']
    connBd.execute('select * from contatos')
    connBd.execute('insert into contatos (nome_contato, telefone_contato, cidade_contato, email_contato) values ( ' + aspas + nome
                   + aspas + virgula + aspas + telefone
                   + aspas + virgula + aspas +
                   cidade + aspas + virgula +
                   aspas + email + aspas + ')')
    connBd.commit()

@app.route("/enviarMensagem", methods=['POST'])
def enviarMensagens():
    numeroMensagem = 0
    content = request.json
    for contatoList in content['listaContatos']:
        numeroMensagem = random.randint(0, (len(content['mensagem']) - 1))
        driver.get("https://web.whatsapp.com/send?phone=+55" + contatoList)
        time.sleep(8)
        if content['temArquivo']:
            try:
                chat_box = driver.find_element_by_xpath(f"//div[@title='Anexar']")
                chat_box.click()
                time.sleep(1)
                anexar = driver.find_element_by_xpath(f"//input[@type='file']")
                anexar.send_keys(os.path.abspath("C:/" + content["nomeArquivo"]))
                time.sleep(2)
                botaoEnviar = driver.find_element_by_xpath(f"//div[@class='_1g8sv NOJWi']")
                botaoEnviar.click()
                time.sleep(2)
            except:
                continue
        try:
            chat_box = driver.find_element_by_xpath(f"//div[@class='_3u328 copyable-text selectable-text']")
            chat_box.click()
            chat_box.send_keys(content['mensagem'][numeroMensagem])
        except:
            continue
        time.sleep(1)
        botao_enviar = driver.find_element_by_xpath(f"//button[@class='_3M-N-']")
        botao_enviar.click()
        time.sleep(1)
    response = app.response_class(
        status=200,
        mimetype='application/json')
    return response

@app.route("/init", methods=['GET'])
def init():
    global driver
    driver = webdriver.Chrome()
    driver.get("https://web.whatsapp.com")
    time.sleep(5)
    response = app.response_class(
        status=200,
        mimetype='application/json')
    return response
