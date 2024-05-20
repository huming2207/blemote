# Blemote for Sony Alpha cameras

This is a Bluetooth remote simulator app for simulating Sony bluetooth remote for Sony Alpha cameras. 

## Motivation

Why reinventing the wheel? Because the existing products are not worthy. 

For example, [this app](https://apps.apple.com/au/app/bt-cam-for-sony-camera-remote/id6443771044) costs AU$29.99 for an one-off payment, just for [sending and receiving a few plain text bytes on a few BLE characteristics](https://github.com/coral/freemote). For an embedded system developer point of view, this is way too overpriced. 

Moreover, some physical remote controllers are also way too overpriced. Sony's orginal RMT-P1BT remote is [AU$129 on Amazon Australia](https://www.amazon.com.au/Sony-RMT-P1BT-Professional-Bluetooth-Commander/dp/B07PLNHGT4), or some ripoffs like JJC or Ulanzi are around CN¥100-150 on Taobao. As a kid from Shenzhen, I doubt the BOM cost can't be higher than CN¥25, plus some profit margins & development cost, it can't be higher than ¥50 or AU$12. Anything higher than that is a waste of money. Therefore I spent a weekend and wrote my own app instead.

I'd also thanks to [Freemote project](https://github.com/coral/freemote) and all other developers for the reverse engineering work. Without their great works, I may have to spend more time digging around.

## License

*GPLv3 + attribution + fair commercial uses*

This means you are free to repack, modify or redistribute (even publish on AppStore under your own name) this app as long as:

1. Follow GPLv3 license, i.e. you need to republish the modified code base
2. You cannot modify this app and make it a proprietary and/or paid app. 
3. You must mention the original author (Jackson Ming Hu)
4. You can add commercial ads, but you can't put it on the main view  (i.e. `src/views/RemoteScreen.tsx`)