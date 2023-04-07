const Address = require("../model/addressModel");

const appController = {
  index:async (req, res) => {
    try {
        let data = await Address.find();
        res.render('index.ejs',{contacts:data})
    }catch (err){
        res.status(500).json({msg:err.message})
    }
  },
  newPage: (req, res) => {
    res.render("create.ejs");
  },
  newAddress: async (req, res) => {
    try {
      const { email, mobile } = req.body;
      const extEmail = await Address.findOne({ email });
      if (extEmail)
        return res.status(400).json({ msg: "Email already Registered" });

      const extMobile = await Address.findOne({ mobile });
      if (extMobile)
        return res
          .status(400)
          .json({ msg: "mobile number already registered" });

      const newAddress = await Address.create(req.body);
      return res
        .status(200)
        .json({ msg: "Successfully added", address: newAddress });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getSingleAddress: async (req,res) => {
    try {
      let id = req.params.id

      let data = await Address.findById({_id:id})

      res.render('edit.ejs',{address:data})
    } catch (error) {
        return res.status(500).json({msg:err.message})
      
    }
  },
  updateAddress: async (req,res) => {
    try {
    let id = req.params.id
    const { email, mobile} = req.body

    const extEmail = await Address.findOne({email})
        if(extEmail)
            return res.status(400).json({msg:"Email already Registered"})
    
    const extMobile = await Address.findOne({mobile})
        if(extMobile)
            return res.status(400).json({msg: "mobile number already registered"})

    const newAddress = await Address.findByIdAndUpdate({_id:id}, req.body)
            return res.status(200).json({msg: "Successfully updated", address:newAddress})

    }catch(err) {
      return res.status(500).json({ msg:err.message})
    }
  },
  deleteAddress: async (req,res) => {
    try{
      let id = req.params.addId

        let extAdd = await Address.findById({ _id:id})
          if(!extAdd)
              return res.status(404).json({msg: "Address id does't exists."})
        await Address.findByIdAndDelete({_id: id})
      res.status(200).json({msg:`Address ${id} successfully deleted`})
    } catch (err){
      return res.status(500).json({msg: err.message})
    }
  }

};

module.exports = appController
