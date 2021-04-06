#####  Universidad De San Carlos de Guatemala
##### Facultad de Inegnieria
##### Escuela de Ciencias y sistemas
##### Redes de computadoras 1  
> ##### Grupo 32
> .

> .

> > **Practica No2**\
> > Manual de Contstruccion y Configuracion 

> > > > Integrantes 

| Nombres  | Carnet |
| ------------- |:-------------:|
| Yovany Enrique Samines Orozco	      | 201403689  |
| Esdras Jonatan Noj Larios	      | 201513699     |
| Juan Daniel Enrique Roman Barrientos	      | 201801364    |
| José Luis Herrera Martínez	|  201807431 |
> .

> .

# Manual de construccion y configuracion 
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)
## Introduccion   
- En la actualidad la conexión de computadores(nodos) es indispensable en la vida cotidiana de la humanidad, es por eso que se han desarrollado e implementado distintas formas para el intercambio de paquetes de datos, viniendo estas desde hace varios años ya. Lo que comenzó con una idea básica ha ido evolucionando hasta convertirse en lo que hoy conocemos como Redes.

- En este manual se explica brevemente la configuración y construcción de ciertas topoligías, encontrandose fotos y algunas descripciones de cada una. Es importante recalcar que para simular un router se utilizó una VPN la cual nos provee servicio por medio de una red privada virtual. El conocimiento del uso de las redes punto a punto y multi punto ayuda a distingir las ventajas y desventajas para darle un mejor uso ante distintas situaciones.

## Configuracion de red Multipunto
La configuracion de red Multipunto tiene la finalidad de poder comunicar las 3 topologias requeridas en el enunciado.
Una vez configurado las toplogias se comprobo que se hiciera ping entre las pc configuradas en la toplogia1, obteniendo resultados exitosos
### Realizando ping entre las pcs
  > - visualizacion de comunicacion de pcs por medio de ping  
 >> ![This is a alt text.](https://cdn.discordapp.com/attachments/656872654287929386/828682984759492638/top3.jpg "This is a sample image.").
## Configuracion de las topologias de red en GNS3
#### Visualizacion de Toplogia 1
 >> ![](https://cdn.discordapp.com/attachments/656872654287929386/828725763355181057/top6.jpg)
> - Cada una de las pc conectado se configuraron sus ping de acuerdo a las vlans configuradas en la toplogia 2, para que estos puedan tener comunicacion con las otras pc del departamento que pertenezcan.
#### Visualizacion de Toplogia 2
>> ![](https://cdn.discordapp.com/attachments/656872654287929386/828732401932697640/top8.PNG)
> - En la Toplogia 2 se configuraron las vlans en el switch Servidor que este fue el ESW1, una vez asignado las vlans en el servidor se configuraron los puertos troncales y permiso de acceso de las vlans en cada switch cliente para que pueda fluir el trafico en conexion de toplogia 2 y 3.
#### Visualizacion Topologia 3
 >> ![](https://cdn.discordapp.com/attachments/656872654287929386/828725775825371226/top7.jpg)
> - En cada equipo se asigno las ip correspondiente de acuerdo a la vlan de cada departamento y en cada switch se configuraron los puertos de acceso para que pueda fluir el trafico y de esta manera poder visualizar las paginas de cada departamento.

## Visualizacion de configuracion de los Vlans y los modos de acceso en los switch
##### Visualizacion de las vlans en ESW1
>> ![](https://cdn.discordapp.com/attachments/656872654287929386/828682908407300127/top1.jpg)
> - Se puede visualizar las vlans 10,20 y 30 con su nombre requerido en el enunciado
##### Visualizacion de puertos en ESW1
>> ![](https://cdn.discordapp.com/attachments/656872654287929386/828682976074137640/top2.jpg)
> - puertos configurados en cada grupo correspondiente y cada una de estos en modo troncal para permitir trafico entre EW3 a ESW1 y de ESW2 a ESW1
##### Visualizacion de puertos en ESW3
>> ![](https://cdn.discordapp.com/attachments/656872654287929386/828682988362792970/top4.jpg)
> - Puertos configurados de modo troncal para permitir trafico entre ESW1 a ESW3 y de ESW2 a ESW3
##### Visualizacion de puertos en ESW2
>> ![](https://cdn.discordapp.com/attachments/656872654287929386/828747116590530660/top9.PNG)
> - Puertos configurados de modo troncal para permitir trafico entre ESW1 A ESW2, ESW3 A ESW2 y de ESW4 a ESW2, de esta forma se configuro en el ESW1 con tres enlaces para permitir las comunicaciones con los switch conectados.


## Comandos Utilizados
#### Comandos utilizados en toplogia 1

> SW1

- ```{r fig.align="center"}
    -vtp domain Grupo32 
    -vtp password Grupo32 
    -vtp mode client

- ```{r fig.align="center"}
    -interface range f1/1 - 2 
    -channel-group 3 mode on
    -exit 

- ```{r fig.align="center"}
    -interface range f1/3 - 4 
    -channel-group 1 mode on
    -exit 

- ```{r fig.align="center"}
    -interface po1
    -switchport mode trunk
    -switchport trunk allowed vlan 1,10,20,1002-1005
    -exit

- ```{r fig.align="center"}
    -interface po3 
    -switchport mode trunk
    -switchport trunk allowed vlan 1,10,20,1002-1005
    -exit

- ```{r fig.align="center"}
    -interface f1/5  
    -switchport mode access
    -switchport access vlan 10
    -exit


> ESW 2 

- ```{r fig.align="center"}
    -vtp domain Grupo32 
    -vtp password Grupo32 
    -vtp mode client

- ```{r fig.align="center"}
    -interface range f1/1 - 2 
    -channel-group 3 mode on
    -exit 

- ```{r fig.align="center"}
    -interface range f1/5 - 6 
    -channel-group 2 mode on
    -exit 

- ```{r fig.align="center"}
    -interface po2
    -switchport mode trunk
    -switchport trunk allowed vlan 1,10,20,1002-1005
    -exit

- ```{r fig.align="center"}
    -interface po3 
    -switchport mode trunk
    -switchport trunk allowed vlan 1,10,20,1002-1005
    -exit

#### Comando utilizado en toplogia2
>  Crear vlans
- ```{r fig.align="center"}
        - vlan 10
        - name ADMINISTRACION
        - exit
    ``` 
>  Crear port-Channel
- ```{r fig.align="center"}
        - interface range f1/1 - 3
        - channel-group 1 mode on
        - show ethernetChannel port-channel
    ``` 
> Configurar los enlaces troncales 
- ```{r fig.align="center"}
        - interface port-channel 1
        - switchport mode trunk
        - switchport trunk allowed vlan 1,10,20,30,1002-1005
        - show int trunk
    ```
> Configurar enlaces troncales que no este en grupo
- ```{r fig.align="center"}
        - interface f1/9
        - switchport mode trunk
        -switchport trunk alllowed vlan 1,10,20,30,1002-1005
    ``` 
> Asignacion de nombre de dominio y password en el servidor (ESW1)
- ```{r fig.align="center"}
        - vtp domain Grupo32
        - vtp password Grupo32
    ``` 
> Cada uno de los comandos en toplogia2 menncionados se utilizan en cada switch para sus configuraciones con sus correspondientes puertos y grupos de enlaces


## Conclusion 
- La VPN actua como router debido a la limitante de distancia, la VPN crea una nueva red para todos los dispositivos dentro de ella.
- Cuando hablamos de un enlace punto a punto, nos referimos a uno en el cual toda la comunicación se produce entre dos puntos, y sólo entre éstos. El caso más común es el de la unión de dos equipos mediante un cable.