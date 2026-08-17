SKILL_NAME    := informational-diagram
SKILL_FILE    := SKILL.md
METADATA_FILE := metadata.json
VERSION       := $(shell jq -r '.version' $(METADATA_FILE))

# Install paths
CLAUDE_SKILLS_DIR   := $(HOME)/.claude/skills
OPENCLAW_SKILLS_DIR ?= $(HOME)/clawd/skills

.PHONY: help install uninstall version check info \
	openclaw-install openclaw-uninstall openclaw-check \
	bump-patch bump-minor bump-major set-version release

.DEFAULT_GOAL := help

help: ## Show this help
	@echo "$(SKILL_NAME) v$(VERSION)"
	@echo ""
	@echo "Usage: make [target]"
	@echo ""
	@echo "Claude Code:"
	@grep -E '^(install|uninstall|check):' $(MAKEFILE_LIST) | grep '##' | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-25s %s\n", $$1, $$2}'
	@echo ""
	@echo "OpenClaw:"
	@grep -E '^openclaw-' $(MAKEFILE_LIST) | grep '##' | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-25s %s\n", $$1, $$2}'
	@echo ""
	@echo "Version & Release:"
	@grep -E '^(version|info|bump-patch|bump-minor|bump-major|set-version|release):' $(MAKEFILE_LIST) | grep '##' | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-25s %s\n", $$1, $$2}'

# ============================================================================
# Claude Code
# ============================================================================
# Skills are directories (SKILL.md + references/), unlike single-file slash
# commands, so install copies the whole skill directory rather than one file.

install: check ## Install skill to ~/.claude/skills/informational-diagram/
	@mkdir -p $(CLAUDE_SKILLS_DIR)/$(SKILL_NAME)
	@cp -R . $(CLAUDE_SKILLS_DIR)/$(SKILL_NAME)/
	@rm -rf $(CLAUDE_SKILLS_DIR)/$(SKILL_NAME)/Makefile
	@echo "Installed $(SKILL_NAME) v$(VERSION) to $(CLAUDE_SKILLS_DIR)/$(SKILL_NAME)/"

uninstall: ## Remove skill from ~/.claude/skills/
	@rm -rf $(CLAUDE_SKILLS_DIR)/$(SKILL_NAME)
	@echo "Uninstalled $(SKILL_NAME) from $(CLAUDE_SKILLS_DIR)"

version: ## Print current version
	@echo $(VERSION)

check: ## Verify skill files and dependencies
	@if [ ! -f $(SKILL_FILE) ]; then \
		echo "Error: $(SKILL_FILE) not found"; exit 1; \
	fi
	@if [ ! -f $(METADATA_FILE) ]; then \
		echo "Error: $(METADATA_FILE) not found"; exit 1; \
	fi
	@if [ ! -f references/color-palette.md ]; then \
		echo "Error: references/color-palette.md not found"; exit 1; \
	fi
	@command -v jq >/dev/null 2>&1 || { echo "Error: jq is required (brew install jq)"; exit 1; }
	@command -v uv >/dev/null 2>&1 || echo "Warning: uv not found — needed for the render/validate step (brew install uv)"
	@echo "All checks passed"

info: ## Show skill metadata
	@echo "Name:        $(SKILL_NAME)"
	@echo "Version:     $(VERSION)"
	@echo "Author:      $(shell jq -r '.author.name' $(METADATA_FILE))"
	@echo "Description: $(shell jq -r '.description' $(METADATA_FILE))"
	@echo "Styles:      $(shell jq -r '.styles | join(", ")' $(METADATA_FILE))"

# ============================================================================
# OpenClaw
# ============================================================================

openclaw-install: check ## Install skill to ~/clawd/skills/
	@mkdir -p $(OPENCLAW_SKILLS_DIR)/$(SKILL_NAME)
	@cp -R . $(OPENCLAW_SKILLS_DIR)/$(SKILL_NAME)/
	@rm -rf $(OPENCLAW_SKILLS_DIR)/$(SKILL_NAME)/Makefile
	@echo "Installed $(SKILL_NAME) v$(VERSION) to $(OPENCLAW_SKILLS_DIR)/$(SKILL_NAME)/"

openclaw-uninstall: ## Remove skill from ~/clawd/skills/
	@if [ -d $(OPENCLAW_SKILLS_DIR)/$(SKILL_NAME) ]; then \
		rm -rf $(OPENCLAW_SKILLS_DIR)/$(SKILL_NAME); \
		echo "Uninstalled $(SKILL_NAME) from $(OPENCLAW_SKILLS_DIR)"; \
	else \
		echo "$(SKILL_NAME) not installed in OpenClaw"; \
	fi

openclaw-check: ## Check if skill is installed in OpenClaw
	@echo "OpenClaw Skill Status"
	@echo "====================="
	@echo "Skills directory: $(OPENCLAW_SKILLS_DIR)"
	@echo ""
	@if [ -f $(OPENCLAW_SKILLS_DIR)/$(SKILL_NAME)/SKILL.md ]; then \
		echo "$(SKILL_NAME): INSTALLED"; \
		echo "  Location: $(OPENCLAW_SKILLS_DIR)/$(SKILL_NAME)/SKILL.md"; \
	else \
		echo "$(SKILL_NAME): NOT INSTALLED"; \
		echo "  Run: make openclaw-install"; \
	fi

# --- Version management ---

bump-patch: ## Bump patch version (x.y.Z)
	@NEW_VERSION=$$(echo $(VERSION) | awk -F. '{print $$1"."$$2"."$$3+1}'); \
	jq --arg v "$$NEW_VERSION" '.version = $$v | .updated = (now | strftime("%Y-%m-%d"))' $(METADATA_FILE) > $(METADATA_FILE).tmp && \
	mv $(METADATA_FILE).tmp $(METADATA_FILE); \
	echo "Bumped version: $(VERSION) → $$NEW_VERSION"

bump-minor: ## Bump minor version (x.Y.0)
	@NEW_VERSION=$$(echo $(VERSION) | awk -F. '{print $$1"."$$2+1".0"}'); \
	jq --arg v "$$NEW_VERSION" '.version = $$v | .updated = (now | strftime("%Y-%m-%d"))' $(METADATA_FILE) > $(METADATA_FILE).tmp && \
	mv $(METADATA_FILE).tmp $(METADATA_FILE); \
	echo "Bumped version: $(VERSION) → $$NEW_VERSION"

bump-major: ## Bump major version (X.0.0)
	@NEW_VERSION=$$(echo $(VERSION) | awk -F. '{print $$1+1".0.0"}'); \
	jq --arg v "$$NEW_VERSION" '.version = $$v | .updated = (now | strftime("%Y-%m-%d"))' $(METADATA_FILE) > $(METADATA_FILE).tmp && \
	mv $(METADATA_FILE).tmp $(METADATA_FILE); \
	echo "Bumped version: $(VERSION) → $$NEW_VERSION"

set-version: ## Set version (make set-version V=1.2.3)
	@if [ -z "$(V)" ]; then echo "Usage: make set-version V=1.2.3"; exit 1; fi
	@echo $(V) | grep -qE '^[0-9]+\.[0-9]+\.[0-9]+$$' || { echo "Error: version must be semver (e.g., 1.2.3)"; exit 1; }
	@jq --arg v "$(V)" '.version = $$v | .updated = (now | strftime("%Y-%m-%d"))' $(METADATA_FILE) > $(METADATA_FILE).tmp && \
	mv $(METADATA_FILE).tmp $(METADATA_FILE)
	@echo "Set version: $(VERSION) → $(V)"

release: check ## Tag and commit a release
	@echo "Releasing $(SKILL_NAME) v$(VERSION)..."
	@git add $(METADATA_FILE) $(SKILL_FILE)
	@git commit -m "Release $(SKILL_NAME) v$(VERSION)"
	@git tag -a "$(SKILL_NAME)-v$(VERSION)" -m "Release $(SKILL_NAME) v$(VERSION)"
	@echo "Created commit and tag $(SKILL_NAME)-v$(VERSION)"
	@echo "Run 'git push && git push --tags' to publish"
