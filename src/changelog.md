Task 1
1. 'FirstComponent' component created.
2. Created 'ProductComponent' component, 'ProductModel' model, 'ProductService' service.
3. Created 'CartComponent' component, 'CartModel' model, 'CartService' service.

Task 2
1. 'FirstModule', 'ProductModule', 'CartModule' were created.
2. 'ProductListComponent', 'CartItemComponent', 'CartListComponent' were created or renamed from old files.
3. 'CartService' and 'ProductService' were changed: 
 - in 'CartService' added chanel and added  'getCarts', 'getSum' and 'addCart' functions
 - in 'ProductService' added 'incrementChannel' and 'decrementChannel' channels and added 'getProducts', 'returnProduct' and 'buyMoreProduct' methods.
4. Changed 'AppComponent'.
5. Added 'CartColorDirective' directive.

Task 4
Pipes were applied to next components:
 - ProductComponent: uppercase, currency
 - ProductListComponent: async
 - CartItemComponent: currency
 - CartListComponent: orderBy

 Task 5.
 1. Create 'ProductFeature' area for routing products.
 2. Create 'AdminFeature' area for manage products and orders.
 3. Create 'Login' component for log in 'AdminFeature' area.
 4. Added create order form in products.
 5. Integrate localStorageService in CartService.