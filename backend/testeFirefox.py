from selenium import webdriver
import time
from flask import Flask
import json
app = Flask(__name__)

global contatos
contatos1 = [{
  "contato":"Gabriel",
  "nome": "Gabriel",
  "numero": "83996554938"
}, {
  "contato":"Gabriel2",
  "nome": "Gabriel2",
  "numero": "839965549382"
}]

@app.route("/recuperarContatos", methods=['GET'])
def recuperarContatos():
    response = app.response_class(
        response=json.dumps(contatos1),
        status=200,
        mimetype='application/json')
    return response

def atualizarJson(listaContatos):
    contatos = open('contatos.json').read()
    contatosLida = recuperarContatos()
    contatosEscrita = open('contatos.json', 'r+')



def enviarMensagens(listContatos, mensagem):
    for contatoList in listContatos:
        findContato = driver.find_element_by_xpath(f"//input[@class='_2zCfw copyable-text selectable-text']")
        time.sleep(1)
        findContato.send_keys(contatoList)
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

@app.route("/init", methods=['GET'])
def init():
    global driver
    driver = webdriver.Chrome()
    driver.get("https://web.whatsapp.com")
    time.sleep(5)
    return True

if __name__ == "__main__":
    app.run()

