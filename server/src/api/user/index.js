/**
 * Created by Hyl on 2016/11/17.
 */
import {
  success,
  error
} from '../../common/utils'
import {HTTP_ERROR} from '../../common/http-constants'
import {SECRET_KEY} from '../constants'
import JWT from 'jsonwebtoken'
import User from '../../graphql/models/user'

const cookie_options = {
  ttl: 365 * 24 * 60 * 60 * 1000, // expires a year from today
  encoding: 'none',    // we already used JWT to encode
  isSecure: false,      // warm & fuzzy feelings
  isHttpOnly: true,    // prevent client alteration
  clearInvalid: false, // remove invalid cookies
  strictHeader: true,  // don't allow violations of RFC 6265
  path: '/'            // set the cookie for all routes
}

const exportMenus = (user) => {
  const relations = user.relations
  const permission = relations.permission
  if (permission) {
    const menus = permission.relations.menus
    if (menus) {
      relations.menus = menus
    }
    delete relations.permission
  }
  return user
}

export const login = {
  auth: false,
  handler: function (request, reply) {
    User.forge(request.payload).fetch({
      withRelated: ['permission.menus']
    }).then(function (user) {
      if (user) {
        exportMenus(user)
        const token = JWT.sign(user, SECRET_KEY)
        success(reply, {
          user: user,
          token
        }).header("Authorization", token).state("token", token, cookie_options)
      } else {
        error(reply, HTTP_ERROR.USER_NOT_EXISTS)
      }
    }, function (err) {
      console.error(err)
      error(reply, HTTP_ERROR.USER_NOT_EXISTS)
    })
  }
}

export const isLogin = {
  auth: 'jwt',
  handler: function (request, reply) {
    const id = request.auth.credentials.id
    User.forge({
      id
    }).fetch({
      withRelated: ['permission.menus']
    }).then(function (user) {
      if (user) {
        success(reply, exportMenus(user))
      } else {
        error(reply, HTTP_ERROR.USER_NOT_EXISTS)
      }
    }, function (err) {
      console.error(err)
      error(reply, HTTP_ERROR.USER_NOT_EXISTS)
    })
  }
}

