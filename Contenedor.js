const fs = require('fs');

class Contenedor {
    constructor(file = "") {
        this.fileName = file;
        this.idCont = 0;
        this.products = [];
    }

    async save(product) {
        await this.getAll();
        this.idCont++;
        this.products.push({...product, id: this.idCont});
        try {
            await fs.promises.writeFile('./' + this.fileName, JSON.stringify(this.products, null, 2));
            console.log(`Producto ${this.idCont} guardado`);
        } catch (error) {
            console.log("save() error: " + error);
        }
    }

    async getById(id) {
        await this.getAll();
        try {
            let idProduct = this.products.find((prod) => prod.id === id)
            if (idProduct) {
                console.log(idProduct);
            } else {
                console.log(null);
            }
        } catch (error) {
            console.log("getById() error: " + error);
        }
    }

    async getAll() {
        try {
            const fileData = await fs.promises.readFile('./' + this.fileName, "utf-8");
            if (fileData) {
                this.products = JSON.parse(fileData);
                this.products.map((prod) => {
                    if (prod.id > this.idCont) this.idCont = prod.id;
                });
            }
            return this.products;
        } catch (error) {
            console.log("getAll() error: " + error);
        }
    }

    async deleteById(id) {
        await this.getAll();
        try {
            const newProducts = this.products.filter((prod) => prod.id !== id);
            await fs.promises.writeFile('./' + this.fileName, JSON.stringify(newProducts, null, 2));
            console.log(`Producto ${id} eliminado`);
        } catch (error) {
            console.log("deleteById() error: " + error);
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile('./' + this.fileName, '');
            console.log("Todos los productos eliminados");
        } catch (error) {
            console.log("deleteAll() error: " + error)
        }
    }
}

module.exports = Contenedor;