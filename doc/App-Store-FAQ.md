#### Is this plugin violates App Store policy? Am I gonna be rejected for using it?

**No, it's not.** Apple's developer agreement allows you to perform over-the-air updates of web code and it's assets.

But if you explicitly ask user if he want's to update the app - you might be rejected with the following message:

```
10.6 Details

Your app includes an update button or alerts the user to update the app. 
To avoid user confusion, app version updates must utilize the iOS built-in update mechanism.
```

If you execute update download and installation on the app startup by showing some splash with the spinner - you should be fine. But if you'll decide to show a dialog with a prompt message _"New update is available. Install it?"_ - according to the Apple this might confuse the user and considered as a bad practice. So, don't show any prompt messages.

#### Can I get banned?

For using plugin - **No**. 

For abusing it and violating Apple's developer policy - sure, as with any other component. For example, if originally your application was a calculator (and user loaded it from the App Store to use as a calculator), but after an update it became a music player - you can get reported to the Apple and banned.

So, don't lie to your users, provide correct content and you will be fine.