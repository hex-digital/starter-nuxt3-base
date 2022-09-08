# Guide > Directory Structure > Constants

We use Constants throughout the application in place of magic strings and other values.

They are much better for several reasons:

**They give domain knowledge and context**  
'Magic' values like 0.72 mean nothing.
EXCHANGE.USD_GBP_RATE provides context about what this value is. This makes code more readable.

**They can be easily changed**  
Running a find and replace on the integer 7 will break your code.
Replacing the constant BASKET.ITEM_LIMIT is effortless.

Alternatively, imagine two countries have a tax rate of 20%. If one were to change,
it's hard work trawling through the code to figure out which belongs to which country.
TAX.UK allows you to change it instantly and without error.

**They protect against typos**  
The compiler won't warn you if you type "opeen" instead of "open".
However DOOR.OPEEN will give you a big, red compiler error.

Constants can be added by creating a file in `~/constants` that exports the individual
constants:

```javascript
// ~/constants/deliveryTimeframes
export const NEXT_DAY = 'next-day';
export const STANDARD = 'standard';

export default {
  NEXT_DAY,
  STANDARD,
};
```

And then used like this:

```vue
<script setup>
import { NEXT_DAY } from '~/constants/deliveryTimeframes'

this.defaultTimeframe = NEXT_DAY
</script>
```

Or alternatively:

```vue
<script setup>
import DELIVERY_TIMEFRAMES from '~/constants/deliveryTimeframes'

this.defaultTimeframe = DELIVERY_TIMEFRAMES.NEXT_DAY
</script>
```

## Notes

It is possible to inject all constants onto a `$const` key using a plugin. We have not
implemented this yet, it is under consideration. This note is a reminder to look into it.
