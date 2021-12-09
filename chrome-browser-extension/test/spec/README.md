## Generated regex

This is what the generated regex looks like in order to whitelist up to 8 Cloud Run revision URLS:

```
.*://(?:rul---|tad---|hux---|jop---|abc---|def---|ghi---|jkl---|)+cloud-run-service-abcdefghij-em.a.run.app/*
```

If the user provides more than 8 revision URLS, Chrome hits a limit where the regex is too big. If the user supplies more than 8 revision URLS, we split the rule into two separate, independent rules.

rules.spec.js tests these conditions.
