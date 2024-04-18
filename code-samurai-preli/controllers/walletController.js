const User = require('../models/userModel');
const mongoose = require('mongoose');



const getWalletBalance = async (req, res) => {

    const { id } = req.params;

    const user = await User.findOne({ user_id: id });
    if (!user) {
        return res.status(404).json({ message: `wallet with id: ${id} was not found` });
    }

    const wallet = {
        wallet_id: user.user_id,
        wallet_balance: user.balance,
        wallet_user: {
            user_id: user.user_id,
            user_name: user.user_name
        }
    }
    res.status(200).json(wallet);
}


const addWalletBalance = async (req, res) => {
    const { id } = req.params;

    const { recharge } = req.body;

    const user = await User.findOne({ user_id: id });

    if (!user) {
        return res.status(404).json({ message: `wallet with id: ${id} was not found` });
    }
    
    rechargeAmount = parseInt(recharge);

    if(rechargeAmount < 100 || rechargeAmount > 10000){
        return res.status(400).json({ message: `invalid amount: ${recharge}` });
    }

    const updatedBalance = user.balance + rechargeAmount;

    const updatedUser = await User.findOneAndUpdate({ user_id: id }, { balance: updatedBalance }, { new: true });

    if (!updatedUser) {
        return res.status(404).json({ message: `wallet with id: ${id} was not found` });
    }

    const updatedResponse = {
        wallet_id: updatedUser.user_id,
        wallet_balance: updatedUser.balance,
        wallet_user: {
            user_id: updatedUser.user_id,
            user_name: updatedUser.user_name
        }
    }

    res.status(200).json(updatedResponse);


}





module.exports = { getWalletBalance, addWalletBalance }