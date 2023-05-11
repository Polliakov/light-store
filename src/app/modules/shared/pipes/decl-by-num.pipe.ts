import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'declByNum'
})
export class DeclByNumPipe implements PipeTransform {

  transform(wordForms: string[], num: number): string {
    if (wordForms.length < 2)
      throw new Error('Need 2 word form at least.');

    if (wordForms.length == 2)
      wordForms.push(wordForms[1]);

      let under100 = Math.abs(num) % 100;

      if (under100 > 9 && under100 < 20) return wordForms[2];

      let under10 = under100 % 10;
      if (under10 > 1 && under10 < 5) return wordForms[1];
      if (under10 == 1) return wordForms[0];
      return wordForms[2];
  }
}
