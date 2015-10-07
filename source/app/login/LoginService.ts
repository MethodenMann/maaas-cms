export class LoginService {
  private numb: number = 33;

  get(): number {
    return this.numb;
  }

  put(i: number) {
    this.numb = i;
  }
}
