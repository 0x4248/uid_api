# UID API

An API to create UID's for web applications and other applications

## Usage

There are two ways to use this API:

- /uid
- /uid/custom

### /uid

This endpoint will return a UID with the default length of 36 characters.

This will return a UID like this:

```
xEcouP60-BAvT-xeer-vE2i-W9gmvbzxQdKA
```

### /uid/custom

This endpoint will return a UID with a custom parameters.

#### Parameters

- length (default: 36 max: 10000)
- split_char (default: - max chars: 10)
- split_every (default: 8)

#### Example

```
/uid/custom?length=10&split_char=*&split_every=2
```

```
5z*xn*Sn*Kd*Id
```

```
/uid/custom?length=40&split_char=-&split_every=8
```

```
rOfoarh6-8pMf0Kh4-zxi2vuML-KgwsTK7R-QkCBVo89
```

## Licence

This project is licensed under the GNU GPLv3 License - see the [LICENCE](LICENCE) file for details