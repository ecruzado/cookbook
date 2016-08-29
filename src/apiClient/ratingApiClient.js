import superagent from 'superagent';

export class RatingApiClient {
    static postRating(rating){
        const req = superagent['post']('http://localhost:8888/ratings')
            .timeout(6000)
            .set('Content-Type', 'application/json')
            .send(rating);
        return req;
    }
}