import axios, { HttpStatusCode } from 'axios';
import { Article } from '../models/Article';

axios.defaults.baseURL = process.env.API_BASE;

export async function submitVote(rating: number) {
    return await axios.post('/vote', { value: rating }).then((resp) => resp.status === HttpStatusCode.Ok)
}

export async function postComment(content: string) {
    return await axios.post('/comment', { content }).then((resp) => resp.status === HttpStatusCode.Ok)
}


export async function fetchRecommended(id: string) {
    return await axios.post<{ articles: Article[] }>('/similar', { id }).then((resp) => resp.status === HttpStatusCode.Ok && resp.data.articles)
}