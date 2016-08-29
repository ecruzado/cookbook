import superagent from 'superagent';

export class CommentApiClient {
    static postComment(comment){
        const req = superagent['post']('http://localhost:8888/comments')
            .timeout(6000)
            .set('Content-Type', 'application/json')
            .send(comment);
        return req;
    }
}