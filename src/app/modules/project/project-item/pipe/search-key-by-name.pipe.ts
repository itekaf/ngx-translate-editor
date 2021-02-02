import { Pipe, PipeTransform } from '@angular/core';
import {KeyModelWithLanguages} from "ngx-translate-lint";

@Pipe({
  name: 'searchKeyByName'
})
export class SearchKeyByNamePipe implements PipeTransform {

  transform(keys: KeyModelWithLanguages[], searchValue): any {
    if (searchValue) {
      return keys.filter((x) => x.name.toLowerCase().trim().includes(searchValue.toLowerCase().trim()));
    }
    return keys;
  }

}
