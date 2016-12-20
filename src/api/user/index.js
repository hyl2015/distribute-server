/**
 * Created by Hyl on 2016/11/17.
 */


export const login = {
    handler: function (request, reply) {

        return reply({result: request.payload})
    }
}
