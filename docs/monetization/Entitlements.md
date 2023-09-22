## Entitlement Resource

Entitlements in Discord represent that a user or guild has access to a premium offering in your application.

### Entitlement Object

###### Entitlement Structure

| Field          | Type              | Description                                                                                 |
| -------------- | ----------------- | ------------------------------------------------------------------------------------------- |
| id             | snowflake         | unique ID of the entitlement                                                                |
| sku_id         | snowflake         | ID of the SKU                                                                               |
| user_id?       | snowflake         | ID of the user that is granted access to the entitlement's sku                              |
| guild_id?      | snowflake         | ID of the guild that is granted access to the entitlement's sku                             |
| application_id | snowflake         | ID of the parent application                                                                |
| type           | integer           | [type of entitlement](#DOCS_PREMIUM_APPS_ENTITLEMENTS/entitlement-object-entitlement-types) |
| consumed       | boolean           | not applicable for app subscriptions. Subscriptions are not consumed and will be false      |
| starts_at?     | ISO8601 timestamp | start date at which the entitlement is valid. Not present when using test entitlements.     |
| ends_at?       | ISO8601 timestamp | date at which the entitlement is no longer valid. Not present when using test entitlements. |

###### Entitlement Example

```json
{
    "id": "1019653849998299136",
    "sku_id": "1019475255913222144",
    "application_id": "1019370614521200640",
    "user_id": "771129655544643584",
    "promotion_id": null,
    "type": 8,
    "deleted": false,
    "gift_code_flags": 0,
    "consumed": false,
    "starts_at": "2022-09-14T17:00:18.704163+00:00",
    "ends_at": "2022-10-14T17:00:18.704163+00:00",
    "guild_id": "1015034326372454400",
    "subscription_id": "1019653835926409216"
}
```

###### Entitlement Types

| Type                     | ID  | Description                                      |
| ------------------------ | --- | ------------------------------------------------ |
| APPLICATION_SUBSCRIPTION | 8   | entitlement was purchased as an app subscription |

## List Entitlements % GET /applications/{application.id#DOCS_RESOURCES_APPLICATION/application-object}/entitlements

Returns all entitlements for a given application, active and expired.

###### Query Params

| param    | type              | description                                         |
| -------- | ----------------- | --------------------------------------------------- |
| guild_id | optional guild_id | filter returned entitlements to a specific guild_id |
| user_id  | optional user_id  | filter returned entitlements to a specific user_id  |

```json
[
    {
        "id": "1019653849998299136",
        "sku_id": "1019475255913222144",
        "application_id": "1019370614521200640",
        "user_id": "771129655544643584",
        "promotion_id": null,
        "type": 8,
        "deleted": false,
        "gift_code_flags": 0,
        "consumed": false,
        "starts_at": "2022-09-14T17:00:18.704163+00:00",
        "ends_at": "2022-10-14T17:00:18.704163+00:00",
        "guild_id": "1015034326372454400",
        "subscription_id": "1019653835926409216"
    }
]
```

## Create Test Entitlement % POST /applications/{application.id#DOCS_RESOURCES_APPLICATION/application-object}/entitlements

Creates a test entitlement to a given SKU for a given guild or user. Discord will act as though that user or guild has entitlement to your premium offering.

This endpoint returns a partial entitlement object. It will **not** contain `subscription_id`, `starts_at`, or `ends_at`, as it's valid in perpetuity.

After creating a test entitlement, you'll need to reload your Discord client. After doing so, you'll see that your server or user now has premium access.

###### JSON Params

| param      | type   | description                                                |
| ---------- | ------ | ---------------------------------------------------------- |
| sku_id     | string | The sku to grant entitlement to, as Discord for this value |
| owner_id   | string | The guild_id or user_id to grant entitlement to            |
| owner_type | int    | `1` for a server subscription, `2` for a user subscription |

```json
{
    "sku_id": "999184799365857331",
    "owner_id": "847184799365857999",
    "owner_type": 1
}
```

## Delete Test Entitlement % DELETE /applications/{application.id#DOCS_RESOURCES_APPLICATION/application-object}/entitlements/{entitlement.id#DOCS_PREMIUM_APPS_ENTITLEMENTS/entitlement-object}

Deletes a currently-active test entitlement. Discord will act as though that user or guild _no longer has_ entitlement to your premium offering.

Returns `204 No Content` on success.

---

## Gateway Events

### New Entitlement

`ENTITLEMENT_CREATE`

Fires when a user subscribes to a SKU. Contains an entitlement object.

```json
{
    "id": "1083167266843000832",
    "sku_id": "1083142056391606272",
    "application_id": "1083108937882013696",
    "user_id": "1072239583707664384",
    "promotion_id": null,
    "type": 8,
    "deleted": false,
    "gift_code_flags": 0,
    "consumed": false,
    "starts_at": "2023-03-08T23:19:58.010876+00:00",
    "ends_at": "2023-04-08T23:19:58.010876+00:00",
    "subscription_id": "1083167255652597760"
}
```

### Updated Entitlement

`ENTITLEMENT_UPDATE`

Fires when a user's subscription renews for the next billing period. The `ends_at` field will have an updated value with the new expiration date.

If a user's subscription is cancelled, you will _not_ receive an `ENTITLEMENT_DELETE` event. Instead, you will simply not receive an `UPDATE` event with a new `ends_at` date at the end of the billing period.

### Deleted Entitlement

`ENTITLEMENT_DELETE`

Fires when a user's entitlement is deleted. Entitlement deletions are infrequent, and occur when:

-   Discord issues a refund for a subscription
-   Discord removes an entitlement from a user via internal tooling

Entitlements are _not_ deleted when they expire.

---

## Using Entitlements in Interactions

### PREMIUM_REQUIRED Interaction Response

As part of Premium Apps, you have access to a new `PREMIUM_REQUIRED` interaction response `type: 10`. This can be sent in response to any kind of interaction. It does not allow a `content` field.

This response will create an ephemeral message shown to the user that ran the interaction, instructing them that whatever they tried to do requires the premium benefits of your app. It also contains an "Upgrade" button to subscribe. The response message is static, but will be automatically updated with the name of your premium SKU.

![Interaction Response](monetization-interaction-response.png)

```js
return res.send({
    type: InteractionResponseType.PREMIUM_REQUIRED, // This has a value of 10
    data: {},
});
```

---

### Entitlement Fields in Interaction

We've also added two new fields within interactions to make handling entitlements easier:

-   `entitlement_sku_ids`: an array of sku_ids that the guild or user currently has entitlement to
-   `entitlements`: an array of full entitlement objects that the guild or user currently has entitlement to

You can reference these fields within an interaction to handle premium status, rather than fetching entitlements from Discord's API or your database.
