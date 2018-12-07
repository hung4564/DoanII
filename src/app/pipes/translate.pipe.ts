import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@services/translate.service';
@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {
  constructor(private translate: TranslateService) { }
  transform(key: string, args: string = ""): string {
    let text: string = "";
    if (key.includes('.')) {
      let keys: string[] = key.split('.');
      let parent = this.translate.data[keys[0]] || null;
      if (!parent) return key;
      keys.splice(0, 1);
      do {
        parent = parent[keys[0]] || null;
        if (!parent) return key;
        keys.splice(0, 1);
      } while (keys.length > 0)
      text = parent;
    }
    else {
      text = this.translate.data[key] || key;
    }
    if (!!args) {
      text = text.replace("#d", args);
    }
    return text
  }
}