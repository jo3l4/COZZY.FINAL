function requireCustomer(req, res, next) {
    if (!req.customer) {
        return res.status(401).json({ error: 'Authentication required' });
    }
    
    next();
}

module.exports = {
    requireCustomer
}