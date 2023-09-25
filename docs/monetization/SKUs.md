## SKU Resource

SKUs (stock-keeping units) in Discord represent premium offerings that can be made available to your application's users or guilds.

### SKU Object

###### SKU Structure

| Field          | Type      | Description                                                 |
| -------------- | --------- | ----------------------------------------------------------- |
| id             | todo      | ID of SKU                                                   |
| type           | integer   | [Type of SKU](#DOCS_MONETIZATION_SKUS/sku-object-sku-types) |
| application_id | snowflake | ID of the parent application                                |
| name           | string    | Customer-facing name of your premium offering               |
| slug           | string    | System-generated URL slug based on the SKU's name           |

###### SKU Example

```json
{
    "id": "1088510058284990888",
    "type": 5,
    "dependent_sku_id": null,
    "application_id": "788708323867885999",
    "manifest_labels": null,
    "access_type": 1,
    "name": "Test Premium",
    "features": [],
    "release_date": null,
    "premium": false,
    "slug": "test-premium",
    "flags": 128,
    "show_age_gate": false
}
```

###### SKU Types

For subscriptions, SKUs will have a type of either `SUBSCRIPTION` represented by `type: 5` or `SUBSCRIPTION_GROUP` represented by `type:6`. For any current implementations, you will want to use the SKU defined by `type: 5`. A `SUBSCRIPTION_GROUP` is automatically created for each `SUBSCRIPTION` SKU and are not used at this time.

| Type               | ID  | Description                                              |
| ------------------ | --- | -------------------------------------------------------- |
| SUBSCRIPTION       | 5   | Represents a recurring subscription                      |
| SUBSCRIPTION_GROUP | 6   | System-generated group for each SUBSCRIPTION SKU created |

For subscriptions, there are two types of access levels you can offer to users:

-   **Guild Subscriptions**: A subscription purchased by a user and applied to a single server. Everyone in that server gets your premium benefits.
-   **User Subscriptions**: A subscription purchased by a user for themselves. They get access to your premium benefits in every server.

The `flags` field can be used to differentiate user and server subscriptions with a bitwise `&&` operator.

-   Guild Subscriptions: `1 << 7`
-   User Subscriptions: `1 << 8`

## Customizing Your SKUs

Within your app's settings, you're able to customize details about your premium offering:

-   A name for your premium SKU, max 80 characters.
-   A description for your premium SKU, max 160 characters
-   An icon for your premium SKU

![Example SKU customization](sku-customization.png)

You're also able to customize a list of up to 6 benefits to explain your premium offering to users. Benefits are displayed on the App Directory and during the purchase and cancellation flows, and each can have:

-   A name, max 80 characters
-   A description, max 160 characters
-   An emoji, standard or custom

![Example of SKU benefits](sku-benefits.png)

## Publishing Your SKUs

When you're ready to launch, you can go to your [app's settings](https://discord.com/developers/applications) and change your SKU to "Published", and your premium offering will be live and available for purchase by users.

From then on, we'll send you daily dashboard emails containing information about purchases, cancellations, and other premium information.

Congratulations on going live! 🥳

## List SKUs % GET /applications/{application.id#DOCS_RESOURCES_APPLICATION/application-object}/skus

Returns all SKUs for a given application. Because of how our SKU and subscription systems work, you will see two SKUs for your premium offering. For integration and testing entitlements, you should use the SKU with `type: 5`.

The `flags` field can be used to differentiate user and server subscriptions with a bitwise `&&` operator.

-   Server Subscriptions: `1 << 7`
-   User Subscriptions: `1 << 8`

```json
[
    {
        "id": "1088510053843210999",
        "type": 6,
        "dependent_sku_id": null,
        "application_id": "788708323867885999",
        "manifest_labels": null,
        "access_type": 1,
        "name": "Test Premium",
        "features": [],
        "release_date": null,
        "premium": false,
        "slug": "test-premium",
        "flags": 128,
        "show_age_gate": false
    },
    {
        "id": "1088510058284990888",
        "type": 5,
        "dependent_sku_id": null,
        "application_id": "788708323867885999",
        "manifest_labels": null,
        "access_type": 1,
        "name": "Test Premium",
        "features": [],
        "release_date": null,
        "premium": false,
        "slug": "test-premium",
        "flags": 128,
        "show_age_gate": false
    }
]
```
