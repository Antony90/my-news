import axios, { HttpStatusCode } from 'axios';

axios.defaults.baseURL = process.env.API_BASE;

export async function submitVote(rating: number) {
    return await axios.post('/vote', { value: rating }).then((resp) => resp.status === HttpStatusCode.Ok)
}

export async function postComment(content: string) {
    return await axios.post('/comment', { content }).then((resp) => resp.status === HttpStatusCode.Ok)
}