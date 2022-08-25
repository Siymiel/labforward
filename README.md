# Labforward interview test

#### By Samuel Kinuthia

## Technologies Used

Node js
Express js
Tailwind Css
[Position stack api (GeoCode)]( http://api.positionstack.com/v1/)

## Added Sections

# Based on Question 1

``` extra_step:
    info:
      title: {{Extra Step title}}
    substeps:
      - primary: {{Extra step instructions here}}

        buttons:
          - label: {{Label here}}
            key: {{key here}}

        behaviors:
          - when:
              on_manual:
                key: {{key here}}
            do: {{command here}}
```

# Based on Question 2
# Added the target weight
```
 - primary: Put {{TargetWeight}} of Ice Tea into the flask and press print.
        expandDescription: true
        description: |
          %col
            ### Stable Weight: {{StableWeight}}
            <br/>
            ### Delta Weight: {{Delta}}
            <br/>
            ***### Target Weight: {{TargetWeight}}***
          <br/>
          <br/>
          %col
            {{button|print}}
```

# Based o Question 3

Value of "data_point.qty". The value is 9.69 { Reason: This is the digital twin of the stable weight }

## Known Bugs

I haven't utilized the .env file as much

