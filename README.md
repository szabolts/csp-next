# MongoDB install

*7.0.4*
### Telepítés
https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/
### Auth
```
show users
```
- nincsenek alapertelmezetten

```
show roles
```
- vannak predefined roleok, de sajat role-okat is letre lehet hozni.
- minden db-nek van sajatja, admin db-nek az osszes predefined, a többi dbnek csak default subsetje van
- userket is külön kell csinálni minden db-hez, lehet ugyanaz a felhasználónév elvileg

**Enable auth:**
- https://www.mongodb.com/docs/current/tutorial/configure-scram-client-authentication/
- a `mongod` parancsok helyett sima systemd restart, mivel configgal indul (mongod.conf) 
- `mongosh`-nál nem szükséges a port, ha jó a default 20217 
- #todo: port megvaltoztatasa + security [checklist](https://www.mongodb.com/docs/current/administration/security-checklist/) ellenorzese 

1. Először létre kell hozni egy **user admint** az admin db-ben, amivel majd lehet usereket és role-okat basztatni:
```mongosh
db.createUser(
  {
    user: "szuperuser",
    pwd: "aesdeegykettoharom",
    roles: [
      { role: "userAdminAnyDatabase", db: "admin" },
      { role: "readWriteAnyDatabase", db: "admin" }
    ]
  }
)
```
Abban a fasszopó shellben nem lehet szerkeszteni, ha nem inline adom meg a jsont...

2. User hozzaadasa adatbazishoz:
```mongosh
use db_name
db.createUser(
  {
    user: "nextcsp",
    pwd: "optikutter420",
    roles: [ { role: "readWrite", db: "csp" } ]
  }
)
```
3. `mongod.conf` -ba bele kell rakni az auth engedelyezeset
```bash
sudo nano /etc/mongod.conf
```

```conf
security:
    authorization: enabled
```
- https://www.mongodb.com/docs/manual/reference/configuration-options/
- conf módosítás utan systemd restartot kell nyomni

Egy systemd restart után mehet is a connect auth-tal:
```bash
mongosh "db_name" -u "username" -p
```
#### Auth hiányában is belép a shellbe, csak nem lesz permission semmire!!

Ahhoz, hogy prismaval működjön replica setet kell létrehozni a standalone db-ből
- mié? me: https://www.prisma.io/docs/orm/overview/databases/mongodb#replica-set-configuration
- Ez egy clusterként fog működni, a db másolatai hálózatba lesznek kapcsolva
- Jelenleg egy node-on megy, de prodban is így fog menni csak több instanceon
- #todo: fain usecasenek tűnik dockerbe rakni
- Replica set setup:
	- https://www.mongodb.com/docs/manual/tutorial/convert-standalone-to-replica-set/
	- ahhoz hogy le lehessen lőni mongoshbol a mongo szerot, csinalni kell egy root felhasznalot(a user adminnal), es aztan azzal kell connectelni mongoshba
pl:
```
db.createUser(
    {
      user: "gigacsedadmin",
      pwd: "kurvaerosjelszo",
      roles: [ "root" ]
    }
)
```

mongod.conf beallitasa:
```
security:
  authorization: enabled
  keyFile: /etc/mongo-security/keyfile.txt
  transitionToAuth: true

replication:
  replSetName: rs0

```

+ keyfilet kell generalni
	- https://www.mongodb.com/docs/manual/tutorial/deploy-replica-set-with-keyfile-access-control/
	- a keyfile az `/etc/mongo-security` -ba menjen, home mappaban szopni fog
	- mongodb:mongodb legyen a  tulaj chmod 400-al
```
sudo mkdir /etc/mongo-security
openssl rand -base64 756 > keyfile.txt
sudo mv keyfile.txt /etc/mongo-security/
chmod 400 /etc/mongo-security/keyfile.txt
sudo chown mongodb:mongodb keyfile.txt 
```


.env -ben a connection stringet be kell allítani
- https://www.prisma.io/docs/orm/overview/databases/mongodb#connection-url

#todo SSL-t meg kene csekkolni mielőtt felkerül a szerveroszra

### TLS/SSH setup
*(egyelőre ilyen nincs)*

https://www.mongodb.com/docs/manual/tutorial/upgrade-cluster-to-ssl/

https://www.mongodb.com/docs/manual/tutorial/configure-ssl/#std-label-configure-mongod-mongos-for-tls-ssl