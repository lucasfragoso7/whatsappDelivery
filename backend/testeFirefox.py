from selenium import webdriver
import time
import os
from flask import Flask, request
import json
app = Flask(__name__)

global contatos

@app.route("/recuperarContatos", methods=['GET'])
def recuperarContatos():
    dir_path = os.path.dirname(os.path.realpath(__file__))
    arq = open(dir_path + '/contatos.json', 'r')
    saudacao = json.load(arq)
    response = app.response_class(
        response=json.dumps(saudacao),
        status=200,
        mimetype='application/json')
    return response

def atualizarJson(listaContatos):
    contatos = open('contatos.json').read()
    contatosLida = recuperarContatos()
    contatosEscrita = open('contatos.json', 'r+')


@app.route("/enviarMensagem", methods=['POST'])
def enviarMensagens():
    content = request.json
    for contatoList in content.listaContatos:
        findContato = driver.find_element_by_xpath(f"//input[@class='_2zCfw copyable-text selectable-text']")
        time.sleep(1)
        findContato.send_keys(contatoList)
        time.sleep(1)
        contato_pesquisado = driver.find_element_by_xpath(f"//span[@title='" + contatoList + "']")
        time.sleep(1)
        contato_pesquisado.click()
        chat_box = driver.find_element_by_class_name('_13mgZ')
        time.sleep(1)
        chat_box.click()
        chat_box.send_keys(content.mensagem)
        botao_enviar = driver.find_element_by_xpath("//span[@data-icon='send']")
        time.sleep(1)
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
if __name__ == "__main__":
    app.run()