terraform {
    required_providers {
        external = {}
    }
}

resource "null_resource" "installer" {
    triggers = {
        install = uuid()
    }

    provisioner "local-exec" {
        working_dir = abspath(join("/", [path.module, "..", ".."]))
        command = join(" ", [
            "npm install --silent ."
        ])
    }

    lifecycle {
        create_before_destroy = true
    }
}

data "external" "handler" {
    program = [ "terraform-handler", "--help" ]

    depends_on = [null_resource.installer]
}

output "input" {
    value = try(jsondecode(lookup(data.external.handler.result, "input", null)), null)
}

output "output" {
    value = try(jsondecode(lookup(data.external.handler.result, "output", null)), null)
}

output "handler" {
    value = data.external.handler
}
