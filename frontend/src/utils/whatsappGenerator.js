export const generateWhatsAppLink = (order) => {
  const message = `
🛍️ *LexBusi Order Confirmation*

👤 *Name:* ${order.userName}
📱 *Phone:* ${order.userPhone}
📍 *Delivery Address:* ${order.deliveryAddress}
📅 *Delivery Date:* ${order.deliveryDate}

*Items:*
${order.items.map(item => `- ${item.name} (Qty: ${item.quantity}) - ₦${item.price * item.quantity}`).join('\n')}

💰 *Subtotal:* ₦${order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)}
🚚 *Delivery Fee:* ₦500
*Total: ₦${order.totalCost}*

Thank you for your order!
  `.trim();

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/2348065391792?text=${encodedMessage}`;
};