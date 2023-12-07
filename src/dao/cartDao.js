const { Cart } = require('./index');

class CartDao {
    async getCarts() {
        try {
            return await Cart.find.callerlean();
        } catch (error) {
            console.error('Error al obtener carritos:', error);
            throw error;
        }
    }

    async createCart() {
        try {
            const cart = new Cart({ products: [] });
            await cart.save();
            return cart;
        } catch (error) {
            console.error('Error al crear un carrito:', error);
            throw error;
        }
    }

    async addProductToCart(cartId, productId, quantity) {
        try {
            const cart = await Cart.findById(cartId);

            if (!cart) {
                throw new Error(`No se encontró el carrito con el ID ${cartId}`);
            }

            cart.products.push({ product: productId, quantity });
            await cart.save();
        } catch (error) {
            console.error('Error al agregar un producto al carrito:', error);
            throw error;
        }
    }

    async getCartById(id) {
        try {
            return await Cart.findById(id);
        } catch (error) {
            console.error(`Error al obtener el carrito con ID ${id}:`, error);
            throw error;
        }
    }
}

module.exports = new CartDao();