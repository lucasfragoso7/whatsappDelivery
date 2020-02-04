from selenium import webdriver
import time
from flask import Flask
import json
listaContatos = [{"nomeContato":"Contato 1","numero":"null"},{"nomeContato":"Contato 5","numero":"null"}]

app = Flask(__name__)
#@app.route("/recuperarContatos")
def recuperarContatos():
    contatos = open('arquivos/contatos.json').read()
    return json.loads(contatos)

def atualizarJson(listaContatos):
    contatos = open('arquivos/contatos.json').read()
    contatosLida = recuperarContatos()
    contatosEscrita = open('arquivos/contatos.json', 'r+')

'''
#@app.route("/")
def enviarMensagens(contatos, mensagem):
    print("entrou aqui")
    for i in contatos:
        contato = driver.find_element_by_xpath(f"//input[@class='_2zCfw copyable-text selectable-text']")
        time.sleep(1)
        contato.send_keys(i)
        time.sleep(1)
        contato_pesquisado = driver.find_element_by_xpath(f"//span[@title='" + i + "']")
        time.sleep(1)
        contato_pesquisado.click()
        chat_box = driver.find_element_by_class_name('_13mgZ')
        time.sleep(1)
        chat_box.click()
        chat_box.send_keys(mensagem)
        botao_enviar = driver.find_element_by_xpath("//span[@data-icon='send']")
        time.sleep(1)
        botao_enviar.click()
        time.sleep(1)

        # driver.find_element_by_name("q").send_keys("cheese" + Keys.RETURN)
        # wait = WebDriverWait(driver, 10)"
        # wait.until(presence_of_element_located((By.CSS_SELECTOR, "h3>a")))
        # results = driver.find_elements_by_css_selector("h3>a")
        # for i, result in results.iteritems():
        # print("#{}: {} ({})".format(i, result.text, result.get_property("href")))

'''
@app.route('/teste/<string:mensagem>', methods=['GET'])
def teste(mensagem):
    return mensagem

#driver = webdriver.Chrome()
#driver.get("https://web.whatsapp.com")
#time.sleep(5)
if __name__ == "__main__":
    app.run()
#atualizarJson(listaContatos)
#enviarMensagens(["Contato 1", "Importante!"], "teste")

