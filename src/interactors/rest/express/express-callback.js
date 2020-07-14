/**
 * Wrapper handlers to comunicate with express 
 * @param {( body: any, query: any, params: any ) => Promise<{ headers?: any, statusCode: number, body?: any } | void>}  handler
 */
exports.makeExpressCallback = (handler) => async (req, res, next) => {
  const httpRequest = {
    body: req.body,
    query: req.query,
    params: req.params,
  }
  
  try {
    const httpResponse = await handler(httpRequest)

    // If not response is provided run next handler
    if (!httpResponse) {
      return next()
    }

    if (httpResponse.headers) {
      res.set(httpResponse.headers)
    }

    return res.status(httpResponse.statusCode).send(httpResponse.body)
  } catch (error) {
    console.error(error)

    return res.status(500).send({ error: 'An unkown error occurred.' })    
  }
}