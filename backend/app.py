from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ishop4u.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# API Base URLs
API_BASE_URL_ESCUE = "https://api.escuelajs.co/api/v1"
API_BASE_URL_FAKE = "https://fakestoreapi.com"

# Database Models
class Product(db.Model):
    id = db.Column(db.String(100), primary_key=True) # Using string for external API IDs
    title = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=True)
    image = db.Column(db.String(255), nullable=True)
    category = db.Column(db.String(100), nullable=True)
    source = db.Column(db.String(50), nullable=False) # e.g., 'escuelajs', 'fakestore', 'amazon'
    affiliate_link = db.Column(db.String(500), nullable=True)

    def __repr__(self):
        return f'<Product {self.title}>'

class CartItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(100), nullable=False) # Assuming user_id from AuthContext
    product_id = db.Column(db.String(100), db.ForeignKey('product.id'), nullable=False)
    quantity = db.Column(db.Integer, default=1)
    notes = db.Column(db.Text, nullable=True)

    product = db.relationship('Product', backref='cart_items')

    def __repr__(self):
        return f'<CartItem {self.id} - User {self.user_id} - Product {self.product_id}>'

# Create database tables if they don't exist
with app.app_context():
    db.create_all()

# Helper function to get or create product
def get_or_create_product(product_data, source):
    product = Product.query.get(product_data['id'])
    if not product:
        image_url = None
        if product_data.get('images') and len(product_data['images']) > 0:
            image_url = product_data['images'][0]

        category_name = None
        if product_data.get('category') and isinstance(product_data['category'], dict) and 'name' in product_data['category']:
            category_name = product_data['category']['name']

        product = Product(
            id=str(product_data['id']), # Ensure ID is a string
            title=product_data['title'],
            price=float(product_data['price']), # Ensure price is a float
            description=product_data.get('description'),
            image=image_url,
            category=category_name,
            source=source,
            affiliate_link=product_data.get('affiliate_link', f"#")
        )
        db.session.add(product)
        db.session.commit()
    return product

@app.route('/api/products', methods=['GET'])
def get_products():
    query = request.args.get('query', '')
    source = request.args.get('source', 'escuelajs') # Default to escuelajs

    try:
        external_products = []
        if source == 'fakestore':
            if query:
                response = requests.get(f"{API_BASE_URL_FAKE}/products")
                response.raise_for_status()
                products_data = response.json()
                products_data = [p for p in products_data if query.lower() in p['title'].lower()]
            else:
                response = requests.get(f"{API_BASE_URL_FAKE}/products")
                response.raise_for_status()
                products_data = response.json()
            
            for p in products_data:
                # Map fakestore product structure to be similar to escuelajs for consistency
                mapped_product = {
                    'id': str(p['id']),
                    'title': p['title'],
                    'price': p['price'],
                    'description': p['description'],
                    'category': {'name': p['category']},
                    'images': [p['image']],
                    'affiliate_link': f"https://fakestoreapi.com/products/{p['id']}" # Generate affiliate link
                }
                external_products.append(mapped_product)

        else: # Default to escuelajs
            if query:
                response = requests.get(f"{API_BASE_URL_ESCUE}/products/?title={query}")
            else:
                response = requests.get(f"{API_BASE_URL_ESCUE}/products")
            response.raise_for_status()
            products_data = response.json()
            
            for p in products_data:
                mapped_product = {
                    'id': str(p['id']),
                    'title': p['title'],
                    'price': p['price'],
                    'description': p.get('description'),
                    'category': p.get('category'),
                    'images': p.get('images'),
                    'affiliate_link': f"https://api.escuelajs.co/api/v1/products/{p['id']}" # Generate affiliate link
                }
                external_products.append(mapped_product)

        # Store products in DB and return them
        db_products = []
        for p_data in external_products:
            product = get_or_create_product(p_data, source)
            db_products.append({
                'id': product.id,
                'title': product.title,
                'price': product.price,
                'description': product.description,
                'image': product.image,
                'category': product.category,
                'source': product.source,
                'affiliate_link': product.affiliate_link
            })
        return jsonify(db_products)

    except requests.exceptions.RequestException as e:
        print(f"RequestException in get_products: {e}")
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        print(f"General Exception in get_products: {e}")
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

@app.route('/api/top_products', methods=['GET'])
def get_top_products():
    try:
        # For now, let's fetch a few products from EscuelaJS as "top products"
        response = requests.get(f"{API_BASE_URL_ESCUE}/products?offset=0&limit=5")
        response.raise_for_status()
        products_data = response.json()

        top_products = []
        for p in products_data:
            mapped_product = {
                'id': str(p['id']),
                'title': p['title'],
                'price': p['price'],
                'description': p.get('description'),
                'category': p.get('category'),
                'images': p.get('images'),
                'affiliate_link': f"https://api.escuelajs.co/api/v1/products/{p['id']}" # Generate affiliate link
            }
            # Store in DB if not exists
            product = get_or_create_product(mapped_product, 'escuelajs')
            top_products.append({
                'id': product.id,
                'title': product.title,
                'price': product.price,
                'description': product.description,
                'image': product.image,
                'category': product.category,
                'source': product.source,
                'affiliate_link': product.affiliate_link
            })
        return jsonify(top_products)

    except requests.exceptions.RequestException as e:
        print(f"RequestException in get_top_products: {e}")
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        print(f"General Exception in get_top_products: {e}")
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

@app.route('/api/shipment_summary', methods=['GET'])
def get_shipment_summary():
    try:
        total_shipment = db.session.query(db.func.sum(Product.price * CartItem.quantity)).join(CartItem).scalar() or 0
        total_order = CartItem.query.count()
        product_shipped = Product.query.filter_by(source='fakestore').count()
        new_goods = Product.query.filter_by(source='escuelajs').count()

        summary = {
            "total_shipment": f"${total_shipment:,.2f}",
            "total_order": total_order,
            "product_shipped": product_shipped,
            "new_goods": new_goods
        }
        return jsonify(summary)

    except Exception as e:
        print(f"General Exception in get_shipment_summary: {e}")
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

@app.route('/api/category_distribution', methods=['GET'])
def get_category_distribution():
    try:
        category_counts = db.session.query(Product.category, db.func.count(Product.id)).group_by(Product.category).all()
        total_products = Product.query.count()

        distribution = []
        for category, count in category_counts:
            distribution.append({
                "name": category or "Uncategorized",
                "value": (count / total_products) * 100 if total_products > 0 else 0
            })
        
        return jsonify(distribution)

    except Exception as e:
        print(f"General Exception in get_category_distribution: {e}")
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

@app.route('/api/delivery_comparison', methods=['GET'])
def get_delivery_comparison():
    try:
        # Dummy data for now
        comparison = {
            "last_month": 4087,
            "this_month": 5506
        }
        return jsonify(comparison)
    except Exception as e:
        print(f"General Exception in get_delivery_comparison: {e}")
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

@app.route('/api/sales_performance', methods=['GET'])
def get_sales_performance():
    time_range = request.args.get('time_range', 'month')
    try:
        # Dummy data for now
        if time_range == 'day':
            data = [
                { "name": 'Mon', "sales": 400, "revenue": 240, "orders": 24 },
                { "name": 'Tue', "sales": 300, "revenue": 139, "orders": 22 },
                { "name": 'Wed', "sales": 200, "revenue": 980, "orders": 29 },
                { "name": 'Thu', "sales": 278, "revenue": 390, "orders": 20 },
                { "name": 'Fri', "sales": 189, "revenue": 480, "orders": 18 },
                { "name": 'Sat', "sales": 239, "revenue": 380, "orders": 25 },
                { "name": 'Sun', "sales": 349, "revenue": 430, "orders": 21 },
            ]
        elif time_range == 'week':
            data = [
                { "name": 'Week 1', "sales": 1200, "revenue": 800, "orders": 85 },
                { "name": 'Week 2', "sales": 1900, "revenue": 1200, "orders": 92 },
                { "name": 'Week 3', "sales": 1600, "revenue": 950, "orders": 78 },
                { "name": 'Week 4', "sales": 2100, "revenue": 1400, "orders": 105 },
            ]
        else: # month
            data = [
                { "name": 'Jan', "sales": 4000, "revenue": 2400, "orders": 240 },
                { "name": 'Feb', "sales": 3000, "revenue": 1398, "orders": 221 },
                { "name": 'Mar', "sales": 2000, "revenue": 9800, "orders": 229 },
                { "name": 'Apr', "sales": 2780, "revenue": 3908, "orders": 200 },
                { "name": 'May', "sales": 1890, "revenue": 4800, "orders": 218 },
                { "name": 'Jun', "sales": 2390, "revenue": 3800, "orders": 250 },
                { "name": 'Jul', "sales": 3490, "revenue": 4300, "orders": 210 },
            ]
        return jsonify(data)
    except Exception as e:
        print(f"General Exception in get_sales_performance: {e}")
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

# Cart Endpoints
@app.route('/api/cart', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    product_id = data.get('product_id')
    user_id = data.get('user_id') # Assuming user_id is passed from frontend for now
    quantity = data.get('quantity', 1)
    notes = data.get('notes')

    if not product_id or not user_id:
        return jsonify({"error": "Product ID and User ID are required."}), 400

    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "Product not found."}), 404

    cart_item = CartItem.query.filter_by(user_id=user_id, product_id=product_id).first()
    if cart_item:
        cart_item.quantity += quantity
        if notes:
            cart_item.notes = notes
    else:
        cart_item = CartItem(user_id=user_id, product_id=product_id, quantity=quantity, notes=notes)
        db.session.add(cart_item)
    
    db.session.commit()
    return jsonify({"message": "Item added to cart", "cart_item_id": cart_item.id}), 201

@app.route('/api/cart', methods=['GET'])
def get_cart():
    user_id = request.args.get('user_id') # Assuming user_id is passed from frontend

    if not user_id:
        return jsonify({"error": "User ID is required."}), 400

    cart_items = CartItem.query.filter_by(user_id=user_id).all()
    cart_data = []
    for item in cart_items:
        cart_data.append({
            'id': item.id,
            'product_id': item.product_id,
            'user_id': item.user_id,
            'quantity': item.quantity,
            'notes': item.notes,
            'product': {
                'id': item.product.id,
                'title': item.product.title,
                'price': item.product.price,
                'image': item.product.image,
                'source': item.product.source,
                'affiliate_link': item.product.affiliate_link
            }
        })
    return jsonify(cart_data)

@app.route('/api/cart/<int:item_id>', methods=['PUT'])
def update_cart_item(item_id):
    data = request.get_json()
    quantity = data.get('quantity')
    notes = data.get('notes')

    cart_item = CartItem.query.get(item_id)
    if not cart_item:
        return jsonify({"error": "Cart item not found."}), 404

    if quantity is not None:
        if not isinstance(quantity, int) or quantity <= 0:
            return jsonify({"error": "Valid quantity (positive integer) is required."}), 400
        cart_item.quantity = quantity
    
    if notes is not None:
        cart_item.notes = notes

    db.session.commit()
    return jsonify({"message": "Cart item updated", "cart_item_id": cart_item.id})

@app.route('/api/cart/<int:item_id>', methods=['DELETE'])
def delete_cart_item(item_id):
    cart_item = CartItem.query.get(item_id)
    if not cart_item:
        return jsonify({"error": "Cart item not found."}), 404

    db.session.delete(cart_item)
    db.session.commit()
    return jsonify({"message": "Cart item removed"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
