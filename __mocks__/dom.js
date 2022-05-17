import { JSDOM } from 'jsdom';

const dom = new JSDOM('<ul></ul>', { url: 'https://localhost/' });
export default dom;
