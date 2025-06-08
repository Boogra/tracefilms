from flask import Blueprint, request, jsonify, session
from src.models.user import User, db
from functools import wraps

admin_bp = Blueprint('admin', __name__)

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        user_id = session.get('user_id')
        is_admin = session.get('is_admin')
        
        if not user_id or not is_admin:
            return jsonify({'error': 'Admin access required'}), 403
        
        user = User.query.get(user_id)
        if not user or not user.is_admin or not user.is_approved:
            return jsonify({'error': 'Admin access required'}), 403
        
        return f(*args, **kwargs)
    return decorated_function

@admin_bp.route('/users', methods=['GET'])
@admin_required
def get_all_users():
    try:
        users = User.query.all()
        return jsonify({
            'users': [user.to_dict() for user in users]
        }), 200
    except Exception as e:
        return jsonify({'error': 'Failed to fetch users'}), 500

@admin_bp.route('/users/pending', methods=['GET'])
@admin_required
def get_pending_users():
    try:
        pending_users = User.query.filter_by(is_approved=False).all()
        return jsonify({
            'pending_users': [user.to_dict() for user in pending_users]
        }), 200
    except Exception as e:
        return jsonify({'error': 'Failed to fetch pending users'}), 500

@admin_bp.route('/users/<int:user_id>/approve', methods=['POST'])
@admin_required
def approve_user(user_id):
    try:
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        user.is_approved = True
        db.session.commit()
        
        return jsonify({
            'message': f'User {user.username} approved successfully',
            'user': user.to_dict()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to approve user'}), 500

@admin_bp.route('/users/<int:user_id>/reject', methods=['POST'])
@admin_required
def reject_user(user_id):
    try:
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Don't delete admin users
        if user.is_admin:
            return jsonify({'error': 'Cannot reject admin users'}), 400
        
        db.session.delete(user)
        db.session.commit()
        
        return jsonify({
            'message': f'User {user.username} rejected and removed'
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to reject user'}), 500

@admin_bp.route('/users/<int:user_id>/toggle-admin', methods=['POST'])
@admin_required
def toggle_admin_status(user_id):
    try:
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Don't allow removing admin status from the original admin
        if user.email == 'vaughn@southernprocurement.com' and user.is_admin:
            return jsonify({'error': 'Cannot remove admin status from primary admin'}), 400
        
        user.is_admin = not user.is_admin
        db.session.commit()
        
        return jsonify({
            'message': f'User {user.username} admin status updated',
            'user': user.to_dict()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to update admin status'}), 500

@admin_bp.route('/users', methods=['POST'])
@admin_required
def create_user():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        username = data.get('username', '').strip()
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')
        is_admin = data.get('is_admin', False)
        
        # Validation
        if not username or not email or not password:
            return jsonify({'error': 'Username, email, and password are required'}), 400
        
        # Check if user already exists
        if User.query.filter_by(username=username).first():
            return jsonify({'error': 'Username already exists'}), 400
        
        if User.query.filter_by(email=email).first():
            return jsonify({'error': 'Email already registered'}), 400
        
        # Create new user (auto-approved when created by admin)
        user = User(
            username=username,
            email=email,
            is_admin=is_admin,
            is_approved=True  # Auto-approved when created by admin
        )
        user.set_password(password)
        
        db.session.add(user)
        db.session.commit()
        
        return jsonify({
            'message': 'User created successfully',
            'user': user.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to create user'}), 500

@admin_bp.route('/stats', methods=['GET'])
@admin_required
def get_stats():
    try:
        total_users = User.query.count()
        approved_users = User.query.filter_by(is_approved=True).count()
        pending_users = User.query.filter_by(is_approved=False).count()
        admin_users = User.query.filter_by(is_admin=True).count()
        
        return jsonify({
            'stats': {
                'total_users': total_users,
                'approved_users': approved_users,
                'pending_users': pending_users,
                'admin_users': admin_users
            }
        }), 200
    except Exception as e:
        return jsonify({'error': 'Failed to fetch stats'}), 500

