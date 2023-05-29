import Cookies from "js-cookie";

//保存cookie
export  function setCookie(name: string, value: string, time: number): void {
  Cookies.set(name, value, { expires: time / 1440, secure: true });
}

//读取cookie
export  function getCookie(name: string): string | undefined {
  return Cookies.get(name);
}

//删除cookie
export function deleteCookie(name: string): void {
    Cookies.remove(name, { path: '', domain: '' });
  }