import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';

export const navigateTo = (
  router: Router,
  ...params: (string | number)[]
): Observable<boolean> => {
  const url = router.url.replace(/\/[^/]*$/, '');
  return from(router.navigate([url, ...params.filter((p) => p !== 'back')]));
};
