import mysql.connector
from faker import Faker
from datetime import datetime


mydb = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "123456",
    database = "delivery_2")

cur = mydb.cursor()

fake = Faker(locale='pt-br')

# insert_estabelecimento = '''
#     insert into estabelecimento 
#         (nome, descricao, endereco, telefone, email)
#     values	
# 	    ('{}', '{}', '{}', '{}', '{}')
#     '''

# for i in range(90):
#     nome = fake.company()
#     descricao = fake.text()
#     endereco = fake.address()
#     telefone = fake.phone_number()
#     email = fake.company_email()
#     sql = insert_estabelecimento.format(nome, descricao, endereco, telefone, email)
#     cur.execute(sql)

# insert_cliente = '''
#     insert into cliente 
#         (nome, endereco, telefone, email)
# 	values
# 	    ('{}', '{}', '{}', '{}')
# '''

# for i in range(90):
#     nome = fake.name()
#     endereco = fake.address()
#     telefone = fake.phone_number()
#     email = fake.email()
#     sql = insert_cliente.format(nome, endereco, telefone, email)
#     cur.execute(sql)

insert_pedido = '''
    insert into pedido 
        (id_cliente, id_estabelecimento, status_pedido, data_hora_pedido)
    values
        ('{}', '{}', '{}', '{}')
'''

def criar_pedido(id_cliente, id_estabelecimento, status_pedido="pendente"):
    id_cliente = id_cliente
    id_estabelecimento = id_estabelecimento
    status_pedido = status_pedido
    data_hora_pedido = datetime.now()
    sql = insert_pedido.format(id_cliente, id_estabelecimento, status_pedido, data_hora_pedido)
    cur.execute(sql)


id_cliente = int(input("Digite id do cliente: "))
id_estabelecimento = int(input("Digite id do estabelecimento: "))

criar_pedido(id_cliente, id_estabelecimento)

mydb.commit()
mydb.close()
