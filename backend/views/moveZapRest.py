from selenium import webdriver
import time
import os
import service.MoveZapService as moveZapService
from flask import Flask, request
import json
import random
app = Flask(__name__)

global contatos

@app.route("/recuperarContatos", methods=['GET'])
def recuperarContatos():
    arq = open('C:/contatos.json', 'r', encoding="utf8")
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
    numeroMensagem = 0
    content = request.json
    for contatoList in content['listaContatos']:
        numeroMensagem = random.randint(0, (len(content['mensagens']) - 1))
        driver.get("https://web.whatsapp.com/send?phone=+55" + contatoList)
        time.sleep(8)
        try:
            chat_box = driver.find_element_by_xpath(f"//div[@class='_3u328 copyable-text selectable-text']")
            chat_box.click()
            chat_box.send_keys(content['mensagens'][numeroMensagem])
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
if __name__ == "__main__":
    app.run()