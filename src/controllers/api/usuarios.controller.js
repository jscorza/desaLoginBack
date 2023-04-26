import { usuarioModel } from '../../models/usuario.model.js'

export async function postUsuarios(req, res, next) {
  console.log(req.body)
  const usuarioCreado = await usuarioModel.create(req.body)
  let rol ;
  if(usuarioCreado.email == 'adminCoder@coder.com' && usuarioCreado.password == "adminCod3r123"){
    rol = "admin"
  }else{
    rol = "user"
  }

  req.session.user = {
    name: usuarioCreado.first_name + ' ' + usuarioCreado.last_name,
    email: usuarioCreado.email,
    age: usuarioCreado.age,
    rol: rol
  }

  res.status(201).json(usuarioCreado)
}